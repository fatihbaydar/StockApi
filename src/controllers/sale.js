"use strict"

const Product = require("../models/product")
const Sale = require("../models/sale")

module.exports = {
    list: async (req, res) => {
        /* 
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(Sale, {}, [
            { path: "userId", select: "username,email" },
            { path: "brandId", select: "name" },
            { path: "productId", select: "name" }
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Sale),
            data
        })
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sale"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Sale"
                }
            }
        */
        req.body.userId = req.user._id

        const currentProduct = await Product.findOne({ _id: req.body.productId })

        if (currentProduct.quantity >= req.body.quantity) {
            const data = await Sale.create(req.body)
            if (data) {
                await Product.updateOne({ _id: data.productId }, { $inc: { quantity: -data.quantity } })
            }

            res.status(201).send({
                error: false,
                data
            })
        } else {
            res.errorStatusCode = 422
            throw new Error(`There is not enough product for this sale, current quantity: ${currentProduct.quantity}`, { cause: { currentProduct } })
        }


    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Sales"]
           #swagger.summary = "Get Single Sale"
        */
        const data = await Sale.findOne({ _id: req.params.id }).populate([
            { path: "userId", select: "username,email" },
            { path: "brandId", select: "name" },
            { path: "productId", select: "name" }
        ])

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Sale"
                }
            }
        */

        if (req.body?.quantity) {
            // current transaction quantity information
            const currentSale = await Sale.findOne({ _id: req.params.id })

            // Calculate the difference
            const difference = req.body.quantity - currentSale.quantity

            // reflecting the difference on the product
            const updatedProduct = await Product.updateOne({ _id: currentSale.productId, quantity: { $gte: difference } }, { $inc: { quantity: -difference } })

            if (updatedProduct.modifiedCount == 0) {
                res.errorStatusCode = 422
                throw new Error("There is not enough product for sale")
            }
            // productId should not change
            req.body.productId = currentPurchase.productId
        }
        const data = await Sale.findOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(220).send({
            error: false,
            data,
            new: await Sale.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Single Sale"
        */
        const currentSale = await Sale.findById(req.params.id)

        const data = await Sale.deleteOne({ _id: req.params.id })

        if (data.deletedCount) {
            await Product.updateOne({ _id: currentSale.productId }, { $inc: { quantity: +currentSale.quantity } })
        }

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
        })
    },

}