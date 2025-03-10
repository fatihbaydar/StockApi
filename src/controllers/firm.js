"use strict"

const Firm = require("../models/firm")

module.exports = {
    list: async (req, res) => {
        /* 
            #swagger.tags = ["Firms"]
            #swagger.summary = "List Firms"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(Firm)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Firm),
            data
        })
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ["Firms"]
            #swagger.summary = "Create Firm"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Firm"
                }
            }
        */
        req.body.images = []
        if (req.files) {
            for (let file of req.files) {
                req.body.images.push(file.path)
            }
        }

        const data = await Firm.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Firms"]
           #swagger.summary = "Get Single Firm"
        */
        const data = await Firm.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ["Firms"]
            #swagger.summary = "Update Firm"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Firm"
                }
            }
        */
        const data = await Firm.findOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(220).send({
            error: false,
            data,
            new: await Firm.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ["Firms"]
            #swagger.summary = "Delete Single Firm"
        */
        const data = await Firm.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
        })
    },

}