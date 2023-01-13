export default class Helper {
  static isServerSide = () => {
    return typeof window === "undefined";
  };
  static errorHandler = (errorCode: number) => {
    switch (errorCode) {
      case 400:
        console.log("handle 400");
        break;
      case 401:
        console.log("handle 401");
        break;
      case 500:
        console.log("handle 500");
        break;
      default:
        console.log("unhandled error code");
        break;
    }
  };
}
