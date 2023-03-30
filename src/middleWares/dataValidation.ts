import joi from 'joi';

export const registerValidation = (data: any) => {
    const schema = joi.object({
        name: joi.string().min(5).max(20).required(),
        email: joi.string().min(10).max(30).email().required(),
        password: joi.string().min(6).max(1024).required()
    });

    return schema.validate(data).error;
};

export const logInValidation = (data: any) => {
    const schema = joi.object({
        email: joi.string().min(10).max(30).email().required(),
        password: joi.string().min(6).max(1024).required()
    });

    return schema.validate(data).error;
};
