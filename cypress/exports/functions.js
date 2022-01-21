/// <reference types='cypress' />

function travelDate(input) {
    const date = new Date();
    const dayOfMonth = date.getDate();
    const departureDay = dayOfMonth + input;
    const year = date.getFullYear();
    const month = date.getMonth();
    const departureDateTUC = new Date(
        Date.UTC(year, month, departureDay, 0, 0, 0)
    );
    const departureDate = departureDateTUC.valueOf();
    const departureDateObj = new Date(departureDate);
    const departureISOstring = departureDateObj.toISOString();
    return departureISOstring.slice(0, 10);
  }

  export default travelDate
  