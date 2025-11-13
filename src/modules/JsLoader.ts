export default class JsLoader {
  static loadFile(url: string, callBack?: () => any) {
    // Check if the script already exists
    const existingScript = document.querySelector(`script[src="${url}"]`);

    // ✅ If already loaded, just call the callback (don’t re-append)
    if (existingScript) {
      if (callBack) callBack();
      return;
    }

    // Otherwise, create and load it
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.onload = () => {
      if (callBack) callBack();
    };
    document.body.appendChild(script);
  }
}
