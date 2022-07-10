const isImageFile = (filePath: string) =>
  filePath.endsWith('.png') ||
  filePath.endsWith('.jpg') ||
  filePath.endsWith('.jpeg') ||
  filePath.endsWith('.gif');

export default isImageFile;
