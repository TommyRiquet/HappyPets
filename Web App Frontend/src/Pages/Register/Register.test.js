import {Register} from './Register';
import {BrowserRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import * as yup from 'yup';
import { sub } from "date-fns/fp"


describe('Register', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Register/>
            </BrowserRouter>
        )
    })
});

const schema = yup.object().shape({
    LastName: yup.string().matches(/^[a-zA-Z]*$/,'Que des characteres').required('Champ obligatoire'),
    FirstName: yup.string().matches(/^[a-zA-Z]*$/,'Que des characteres').required('Champ obligatoire'),
    Age: yup.date().max(sub({ years: 18 }, new Date()), "Il faut être âgé de 18 ans minimum").required('Champ obligatoire'),
    City: yup.string().matches(/^[a-zA-Z]*$/,'Que des characteres').required('Champ obligatoire'),
    Postal: yup.number().min(1000,'Code postal incorrect').test('len', 'Numero incorrect', (val) => { if(val) return val.toString().length === 4; }).required('Champ obligatoire'),
    Email: yup.string().email().required('Champ obligatoire'),
    Phone: yup.number().test('len', 'Numero incorrect', (val) => { if(val) return val.toString().length === 9; }).required('Champ obligatoire'),
    Password: yup.string().min(8, '8 Charactère minimum.').minNumbers(2,'Le mot de passe doit contenir 2 numéro minimum').required('Champ obligatoire'),
    Password2: yup.string().required("Confirmation de mot de passe est obligatoire").oneOf([yup.ref("Password"), null],"Mot de passe différent"),
    Terms: yup.bool().required('Champ obligatoire').oneOf([true], 'Accepter les terms'),
  });

  let errors = [];

  let TestValueName = {LastName: 'Raph77l',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  let TestValueName2 = {LastName: 'Raphae l',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  let TestValueName3 = {LastName: 'Raphae%Ml',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  let TestValueName4 = {LastName: '',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  let TestValueName5 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  
try{
    schema.validateSync(TestValueName);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueName2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueName3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueName4);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueName5);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValueFirstName = {LastName: 'Raphael',FirstName: 'Ma88o',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueFirstName2 = {LastName: 'Raphael',FirstName: 'Mar to',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueFirstName3 = {LastName: 'Raphael',FirstName: 'Mar%%to',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueFirstName4 = {LastName: 'Raphael',FirstName: '',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueFirstName5 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  
try{
    schema.validateSync(TestValueFirstName);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueFirstName2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueFirstName3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueFirstName4);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueFirstName5);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValueAge = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2018',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueAge2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValueAge);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueAge2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValueCity = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bo55nlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueCity2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bon%%lez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueCity3 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bon lez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueCity4 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: '',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueCity5 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
  
try{
    schema.validateSync(TestValueCity);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueCity2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueCity3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueCity4);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueCity5);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValuePostal = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 100,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValuePostal2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 99999,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValuePostal3 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValuePostal);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePostal2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePostal3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValueEmail = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mardzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueEmail2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzdcom',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueEmail3 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: '',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValueEmail4 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValueEmail);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueEmail2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueEmail3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueEmail4);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValuePhone = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValuePhone2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('01544'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}
let TestValuePhone3 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValuePhone);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePhone2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePhone3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValuePassword = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MAR',Password2: 'MARARARA88',Terms: true,}
let TestValuePassword2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA',Password2: 'MARARARA88',Terms: true,}
let TestValuePassword3 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: '',Password2: 'MARARARA88',Terms: true,}
let TestValuePassword4 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValuePassword);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePassword2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePassword3);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePassword4);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValuePassword21 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARAR8',Terms: true,}
let TestValuePassword22 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: '',Terms: true,}
let TestValuePassword23 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValuePassword21);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePassword22);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValuePassword23);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

let TestValueTerms = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARAR8',Terms: false,}
let TestValueTerms2 = {LastName: 'Raphael',FirstName: 'Marto',Age: '10-12-2000',City: 'bonlez',Postal: 1325,Email: 'Mar@dzd.com',Phone: parseInt('0475986487'),Password: 'MARARARA88',Password2: 'MARARARA88',Terms: true,}

try{
    schema.validateSync(TestValueTerms);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}
try{
    schema.validateSync(TestValueTerms2);
    errors.push('true');
} catch (err){
    errors.push(err['errors'][0]);
}

describe('RegisterVerify', () => {
    it('Verif champ Name', async () => {
        expect(errors[0]).toBe('Que des characteres');
        expect(errors[1]).toBe('Que des characteres');
        expect(errors[2]).toBe('Que des characteres');
        expect(errors[3]).toBe('Champ obligatoire');
        expect(errors[4]).toBe('true');
    })
    it('Verif champ FirstName', async () => {
        expect(errors[5]).toBe('Que des characteres');
        expect(errors[6]).toBe('Que des characteres');
        expect(errors[7]).toBe('Que des characteres');
        expect(errors[8]).toBe('Champ obligatoire');
        expect(errors[9]).toBe('true');
    })
    it('Verif champ Age', async () => {
        expect(errors[10]).toBe('Il faut être âgé de 18 ans minimum');
        expect(errors[11]).toBe('true');
    })
    it('Verif champ City', async () => {
        expect(errors[12]).toBe('Que des characteres');
        expect(errors[13]).toBe('Que des characteres');
        expect(errors[14]).toBe('Que des characteres');
        expect(errors[15]).toBe('Champ obligatoire');
        expect(errors[16]).toBe('true');
    })
    it('Verif champ Postal', async () => {
        expect(errors[17]).toBe('Code postal incorrect');
        expect(errors[18]).toBe('Numero incorrect');
        expect(errors[19]).toBe('true');
    })
    it('Verif champ Email', async () => {
        expect(errors[20]).toBe('Email must be a valid email');
        expect(errors[21]).toBe('Email must be a valid email');
        expect(errors[22]).toBe('Champ obligatoire');
        expect(errors[23]).toBe('true');
    })
    it('Verif champ Phone', async () => {
        expect(errors[24]).toBe('Numero incorrect');
        expect(errors[25]).toBe('Numero incorrect');
        expect(errors[26]).toBe('true');
    })
    it('Verif champ Password', async () => {
        expect(errors[27]).toBe('Mot de passe différent');
        expect(errors[28]).toBe('Mot de passe différent');
        expect(errors[29]).toBe('Mot de passe différent');
        expect(errors[30]).toBe('true');
    })
    it('Verif champ Password2', async () => {
        expect(errors[31]).toBe('Mot de passe différent');
        expect(errors[32]).toBe('Confirmation de mot de passe est obligatoire');
        expect(errors[33]).toBe('true');
    })
    it('Verif champ Term', async () => {
        expect(errors[34]).toBe('Accepter les terms');
        expect(errors[35]).toBe('true');
    })
});