import { useState } from "react";
import { stateFetch } from "../typescript/types/stateFetch";

const useFetch = (url: string, obj = {}) => {
  const [state, setState] = useState<stateFetch>("loading");
};
