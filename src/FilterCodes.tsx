import { useState } from "react";
import "./FilterCodes.css";

export default function FilterCodes() {
  const [rawText, setRawText] = useState("");
  const [response, setResponse] = useState<any>(new Array());
  const [keysSize, setKeysSize] = useState(0);

  function handleTextChange(e: any) {
    setRawText(e.target.value);
  }

  function convertText(e: any) {
    let rawEmails = rawText.split("Quantity");
    rawEmails = rawEmails.slice(1, rawEmails.length);

    const filteredEmails = new Map<string, string>();

    rawEmails.forEach((email, index) => {
      const arrayEmail = email.split("\n");
      setKeysSize(index + 1);

      if (filteredEmails.get(arrayEmail[2])) {
        const code = arrayEmail[6] == "Redeem Code" ? arrayEmail[4] : arrayEmail[6];
        filteredEmails.set(
          arrayEmail[2],
          filteredEmails.get(arrayEmail[2]) + "\n" + code.split("Gift Code: ")[1]
        );
      } else {
        if (arrayEmail[2] !== "Microsoft	") {
          const code = arrayEmail[6] == "Redeem Code" ? arrayEmail[4] : arrayEmail[6];
          filteredEmails.set(arrayEmail[2], code.split("Gift Code: ")[1]);
        }
      }
    });

    setResponse(convertMapToObject(filteredEmails));
  }

  function convertMapToObject(map: Map<string, string>) {
    const iterator = Array.from(map.keys());
    const obj: any = {};
    iterator.forEach((gameName) => {
      if (gameName !== undefined) {
        obj[gameName] = map.get(gameName);
      }
    });
    return obj;
  }

  const rows = Object.entries(response).map(([key, value]: any) => {
    const parsedValue = value.split("\n");

    return (
      <tr key={key}>
        <td style={{}}>
          <h2>{key ? `${key} (${parsedValue.length} keys)` : "NO SE ENCONTRÓ EL NOMBRE"}</h2>
        </td>
        <td>{parsedValue.length > 0 && parsedValue.map((code: string) => <div>{code}</div>)}</td>
      </tr>
    );
  });

  return (
    <div className="App">
      <div>
        <textarea
          style={{ width: "1000px", height: "500px", marginTop: "50px" }}
          value={rawText}
          placeholder="Emails"
          onChange={handleTextChange}
        />
      </div>
      <button onClick={convertText}>Convertir texto</button>
      <div>
        <table style={{ width: "100%", border: "1px solid black" }}>
          <thead>
            <tr>
              <th>NOMBRE DEL JUEGO</th>
              <th>KEYS</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      {keysSize > 0 && <h1>La cantidad total de Keys es de: {keysSize}</h1>}
    </div>
  );
}