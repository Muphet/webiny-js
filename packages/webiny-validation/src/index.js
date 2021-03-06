// @flow
import Validation from "./validation";
import ValidationError from "./validationError";
import creditCard from "./validators/creditCard";
import email from "./validators/email";
import eq from "./validators/eq";
import gt from "./validators/gt";
import gte from "./validators/gte";
import isIn from "./validators/in";
import integer from "./validators/integer";
import json from "./validators/json";
import lt from "./validators/lt";
import lte from "./validators/lte";
import maxLength from "./validators/maxLength";
import minLength from "./validators/minLength";
import number from "./validators/number";
import password from "./validators/password";
import phone from "./validators/phone";
import required from "./validators/required";
import url from "./validators/url";

const validation = new Validation();
validation.setValidator("creditCard", creditCard);
validation.setValidator("email", email);
validation.setValidator("eq", eq);
validation.setValidator("gt", gt);
validation.setValidator("gte", gte);
validation.setValidator("in", isIn);
validation.setValidator("integer", integer);
validation.setValidator("json", json);
validation.setValidator("lt", lt);
validation.setValidator("lte", lte);
validation.setValidator("maxLength", maxLength);
validation.setValidator("minLength", minLength);
validation.setValidator("number", number);
validation.setValidator("password", password);
validation.setValidator("phone", phone);
validation.setValidator("required", required);
validation.setValidator("url", url);

export { validation, Validation, ValidationError };
