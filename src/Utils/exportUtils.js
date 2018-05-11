import { unparse as toCsv } from 'papaparse';
import { pick } from 'lodash';

export const exportToFile = (collection, { headers, fileName } = {}) => {
  const formattedCollection = toCsv(formatHeaders(collection, headers));
  if (window.navigator.msSaveorOpenBlob) {
    var data = ['\ufeff' + formattedCollection];
    var blob = new Blob(data);
    window.navigator.msSaveOrOpenBlob(blob, fileName ? fileName : 'defaultExport.csv');
  } else {
    var data = new Blob([formattedCollection], { type: 'text/csv' });
    var url = URL.createObjectURL(data);
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', (fileName ? fileName.replace(".xls", ".csv") : 'defaultExport.csv'));
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return false;
  }
}
export const formatHeaders = (collection, headers) => {
  if (!headers) return collection;
  const newCollection = collection.map(model => Object.assign({}, ...headers.map(header => {
    if (!header.key) console.warn(JSON.stringify(header), 'missing headerKey {key:fieldName}');
    if (header.name) {
      const obj = {};
      obj[header.name] = model[header.key];
      return obj;
    } else {
      return pick(model, header.key);
    }
  })));
  return newCollection
}