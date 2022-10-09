import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { url } from "../../my-axios";
import { formatCamelCase } from "../../utils/string";

import classes from "./Status.module.scss";

const Status = (props) => {
  const { statusId, className } = props;

  const [status, setStatus] = useState("");

  const { sendRequest } = useHttp();

  useEffect(() => {
    if (!status) {
      const initStatusValue = (statusObj) => {
        const { value } = statusObj;
        setStatus(value);
      };

      const requestConfig = {
        method: "get",
        url: `${url}/statuses/getStatusById`,
        params: {
          id: statusId,
        },
      };

      sendRequest(requestConfig, initStatusValue);
    }
  }, [sendRequest, status, statusId]);

  const formattedStatus = formatCamelCase(status);

  return (
    <span
      className={`${classes.status} ${
        classes[`status-${status}`]
      } ${className}`}
    >
      {formattedStatus}
    </span>
  );
};

export default React.memo(Status);
