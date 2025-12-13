const getStartEndOfDay = (timeZone = "Asia/Jakarta") => {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("id-ID", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [{ value: year }, , { value: month }, , { value: day }] =
    formatter.formatToParts(now);

  // Buat Date UTC dari tanggal timezone target
  const start = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  const end = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

  return { start, end };
};

export default getStartEndOfDay;
