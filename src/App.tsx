import { useState } from "react";
import "./App.css";

function App() {
  const [rawText, setRawText] = useState("");
  const [response, setResponse] = useState<any>(new Array());

  function handleTextChange(e: any) {
    setRawText(e.target.value);
  }

  function convertText(e: any) {
    const rawEmails = rawText.split("Quantity");
    const filteredEmails = new Map<string, string>();

    rawEmails.forEach((email) => {
      const arrayEmail = email.split("\n");

      if (filteredEmails.get(arrayEmail[2])) {
        filteredEmails.set(
          arrayEmail[2],
          filteredEmails.get(arrayEmail[2]) + "\n" + arrayEmail[6].split("Gift Code: ")[1]
        );
      } else {
        if (arrayEmail[2] !== "Microsoft	") {
          filteredEmails.set(arrayEmail[2], arrayEmail[6].split("Gift Code: ")[1]);
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
          <h2>{key ? key : "NO SE ENCONTRÓ EL NOMBRE"}</h2>
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
    </div>
  );
}

export default App;
