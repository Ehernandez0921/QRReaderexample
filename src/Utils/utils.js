export { default as exportUtils, exportToFile } from './exportUtils';
export const fetchBarcodeData = async (barcode) => {
    console.log( 'utils.js Line-3');
    try {
        const response = await fetch(`/searchCode/${barcode}`);
        const data = await response.json();
        return data;
    } catch (error) {

    }
}