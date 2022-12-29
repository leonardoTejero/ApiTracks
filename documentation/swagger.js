const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Informacion de la documentacion
 */

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de Api Rest de Canciones",
        description: "Api construida en NodeJs, CRUD de Usuarios, Canciones, Almacenamiento de archivos(storage)",
        version: "1.0",
        contact: {
            name: "Andres tejero",
            url: "https://www.linkedin.com/in/leonardo-tejero-8a0b3a152/",
            email: "leonardo.tejero@gmail.com"
        }
    },
    servers: [
        {
            url: "http://localhost:4000/api"
        },
        {
            url: "https://apitracksnode.onrender.com/api"
        },
        {
            url: "http://localhost:4001/api"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            },
            authRegister: {
                type: "object",
                required: ["email", "password", "age", "name"],
                properties: {
                    name: {
                        type: "string"
                    },
                    age: {
                        type: "integer"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                }
            },
            tracks: {
                type: "object",
                required: ["name", "albun", "cover", "artist"],
                properties: {
                    name:{
                        type: "string"
                    },
                    albun: {
                        type: "string"
                    },
                    cover: {
                        type: "string"
                    },
                    artist: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            nickname: {
                                type: "string"
                            },
                            nacionality: {
                                type: "string"
                            }
                        }
                    },
                    duration: {
                        type: "object",
                        properties: {
                            start: {
                                type: "integer"
                            },
                            end: {
                                type: "integer"
                            }
                        }
                    }
                }
            },
            storage:{
                type: "object",
                properties: {
                    url: {
                        type: "string"
                    },
                    fileName: {
                        type: "string"
                    }
                }
            },
            users: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    age: {
                        type: "integer"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            }
        }
    }
}

/**
 * Opciones
 */

const options = {
    swaggerDefinition,
    apis: [
        "./routes/*.js"
    ]
}

const openApiConfiguration = swaggerJsdoc(options);


module.exports = openApiConfiguration