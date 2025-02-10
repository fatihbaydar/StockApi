"use strict"

const Product = require("../models/product")

module.exports = {
    list: async (req, res) => {
        /* 
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(Product)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Product),
            data
        })
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Product"
                }
            }
        */
        const data = await Product.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Products"]
           #swagger.summary = "Get Single Product"
        */
        const data = await Product.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Product"
                }
            }
        */
        const data = await Product.findOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(220).send({
            error: false,
            data,
            new: await Product.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ["Products"]
            #swagger.summary = "Delete Single Product"
        */
        const data = await Product.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
        })
    },

}