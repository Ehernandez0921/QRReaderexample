export { default as exportUtils, exportToFile } from './exportUtils';
export const fetchBarcodeData = async (barcode) => {
    try {
        const response = await fetch(`/product/${barcode}/70F7A52D147BABF68FA32CD9D6B01A0A`);
        const data = await response.json();
        return data;
    } catch (error) {

    }
}