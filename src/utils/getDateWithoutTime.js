export function getCurrentDateWithoutTime() {
    const currentDate = new Date();
    // const dateOnly = currentDate.toISOString().split('T')[0];
    const dateOnly = currentDate.toDateString();
    return dateOnly;
  }