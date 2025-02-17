# STOCK MANAGEMENT API

This is a Stock Management Api study. In this study i want to make an api for sellers to gain information abaout their products, firms and brands.
    * I aimed to provide sellers with control over their products. 
    * Sellers can also see information about the brands and companies they sell to. 
    * The API also keeps log records. 
    * File uploads are made with multer.
    * And An e-mail is sent to the new user with nodemailer.
    
### ERD:
![ERD](./erdStockAPI.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    package.json
    readme.md
    swaggerAutogen.js
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            brand.js
            category.js
            firm.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            queryHandler.js
            logger.js
            permissions.js
            upload.js
        models/
            brand.js
            category.js
            firm.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
        routes/
            auth.js
            brand.js
            category.js
            document.js
            firm.js
            index.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
```