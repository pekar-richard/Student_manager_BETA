export function formatDateTimeLocal(d) {
  if (d == "") {
    return "";
  }

  if (typeof d === "string") {
    d = new Date(d);
  }

  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0") +
    "T" +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0")
  );

  // (2020-05-11T22:02)
}

export function formatDateLocal(d) {
  // (2020-05-11)
  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0")
  );
}

export function formatDateTime(d) {
  // (22.02.2020 der Sonntag um 01:00)
  var d = new Date(d);
  var days = [
    "Am Sonntag",
    "Am Montag",
    "Am Dienstag",
    "Am Mittwoch",
    "Am Donnerstag",
    "Am Freitag",
    "Am Samstag",
  ];
  return (
    days[d.getDay()] +
    " den " +
    d.getDate().toString().padStart(2, "0") +
    "." +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    d.getFullYear() +
    " um " +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0")
  );
}

export function formatDateTimeCompare(d) {
  // (22.02.2020 01:00)
  var d = new Date(d);
  return (
    d.getDate().toString().padStart(2, "0") +
    "." +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    d.getFullYear() +
    " " +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0")
  );
}

export function formatDateTime2(d) {
  // (22.02.2020 01:00)
  var d = new Date(d);
  return (
    d.getDate().toString().padStart(2, "0") +
    "." +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    d.getFullYear() +
    " um " +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0")
  );
}
