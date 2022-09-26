import axios from "axios";
import logger from "../utils/logger.js";

const httpTest = async () => {
  //Get product
  try {
    let request = await axios.get("http://localhost:8080/productos/api");
    let response = request.data;

    if (typeof response === "object") {
      logger.info("getProducts response type PASS");
    } else {
      logger.error("getProducts response type FAIL");
    }

    if (request.status >= 200 && request.status < 400) {
      logger.info("getProducts response status PASS");
    } else {
      logger.error("getProducts response status FAIL");
    }

    request = await axios.post("http://localhost:8080/productos/api", {
      title: "Generic Product",
      price: "205.00",
      thumbnail: "https://loremflickr.com/640/480/animals",
    });
    response = request.data;
    const { id } = response.at(-1);

    if (typeof response === "object") {
      logger.info("postProduct response type PASS");
    } else {
      logger.error("postProduct response type FAIL");
    }

    if (request.status >= 200 && request.status < 400) {
      logger.info("postProduct response status PASS");
    } else {
      logger.error("postProduct response status FAIL");
    }

    request = await axios.put("http://localhost:8080/productos/api/"+id, { title: "Modified Product" });
    response = request.data;

    if (typeof response === "object") {
      logger.info("updateProduct response type PASS");
    } else {
      logger.error("updateProduct response type FAIL");
    }

    if (request.status >= 200 && request.status < 400) {
      logger.info("updateProduct response status PASS");
    } else {
      logger.error("updateProduct response status FAIL");
    }

    request = await axios.delete("http://localhost:8080/productos/api/"+id);
    response = request.data;

    if (typeof response === "object") {
      logger.info("deleteProduct response type PASS");
    } else {
      logger.error("deleteProduct response type FAIL");
    }

    if (request.status >= 200 && request.status < 400) {
      logger.info("deleteProduct response status PASS");
    } else {
      logger.error("deleteProduct response status FAIL");
    }
  } catch (e) {
    console.error(e.message);
  }
};

httpTest();
