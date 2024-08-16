export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get day with ordinal suffix
    const day = date.getDate();
    const daySuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    // Get month name
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = monthNames[date.getMonth()];

    // Get year
    const year = date.getFullYear();

    // Get hours and minutes with leading zero if necessary
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Construct the final formatted date
    const formattedDate = `${day}${daySuffix(day)}, ${month}, ${year}, ${hours}:${minutes} ${ampm}`;
    return formattedDate;
};
