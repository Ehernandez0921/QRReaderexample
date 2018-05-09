export const columns = [
  { title: 'id', dataIndex: 'id', key: 'id' },
  { title: 'numTrackAppRej', dataIndex: 'numTrackAppRej', key: 'numTrackAppRej' },
];
/**
 * @param {string} title 'title to be shown on the button
 * @param {string} name 'name to name in button on the dom for key
 * @param {function} onClick 'event to happen when button is clicked. Will have access to the main table (buttonEvent,Table);
 */
export const tableButtons = [
  {
    title: 'Test Add',
    name: 'testAdd',
    onClick: (buttonEvent, Table) => {
      console.log(buttonEvent, Table);
    }
  },
  {
    title: 'Test Another',
    name: 'testAnother'
  }
]