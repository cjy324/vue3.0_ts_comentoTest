export function toInt(data: any, defaultValue: any) {
  if ( data == undefined || data == null || isNaN(data) ) {
    return defaultValue;
  }
  return parseInt(data)
}

export function toIntOrNull(data: any) {
  return toInt(data, null);
}
