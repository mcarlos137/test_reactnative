export default {
  create(url: string, path: string, method: string, body: any, formData: any) {
    if (method === "GET") {
      if (body !== null) {
        return {
          url: url,
          path: path,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      } else {
        return {
          url: url,
          path: path,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      }
    }
    if (method === "POST") {
      if (formData) {
        return {
          url: url,
          path: path,
          data: body,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          method: "POST",
        };
      } else {
        return {
          url: url,
          path: path,
          data: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Content-Length": JSON.stringify(body).length,
          },
          method: "POST",
        };
      }
    }
    if (method === "PUT") {
      if (body !== null) {
        return {
          url: url,
          path: path,
          data: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "PUT",
        };
      } else {
        return {
          url: url,
          path: path,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "PUT",
        };
      }
    }
  },
};
