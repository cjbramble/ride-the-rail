/// <reference types='cypress' />

import { dayOfMonth, year, month } from "../exports/constants.js";

function travelDate(input) {
    const departureDay = dayOfMonth + input;
    const departureDateTUC = new Date(
        Date.UTC(year, month, departureDay, 0, 0, 0)
    );
    const departureDate = departureDateTUC.valueOf();
    const departureDateObj = new Date(departureDate);
    const departureISOstring = departureDateObj.toISOString();
    return departureISOstring.slice(0, 10);
}

export default travelDate;
