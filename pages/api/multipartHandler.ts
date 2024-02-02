import formidable from 'formidable';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const form = formidable({ multiples: true }); // uploaded files will be an array

// Middleware
async function parseMultipartForm(req: any, res: any, next: any) {
  if (req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        console.log("files!!!"+req.files)
        console.log("바디!!!"+req.body)
        req.body = fields;
        req.files = files;
      }
      next();
    });
  } else {
    next();
  }
}

// Disable NextJS body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};


export default parseMultipartForm;