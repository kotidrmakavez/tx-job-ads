export function getRandomInt() {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(100);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function calculateDueDate(jobCreatedDate: Date): Date {
  let transformedJobDate = new Date(jobCreatedDate);
  transformedJobDate.setMonth(transformedJobDate.getMonth() + 2);

  const dueDate = new Date(
    transformedJobDate.getFullYear(),
    transformedJobDate.getMonth() + 1,
    0,
  );

  return dueDate;
}
