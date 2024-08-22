import { validationResult } from 'express-validator';
import ConflictError from '../errors/ConfictError.js';

function doValidation(request, response, next) {
    const result = validationResult(request);
    if (result.isEmpty()) {
        return next();
    }

    const errObj = { errors: result.array() };
    next(new ConflictError('Input validation Failed', errObj));
}

export function CheckValidation(rules) {
    return [rules, doValidation];
}
