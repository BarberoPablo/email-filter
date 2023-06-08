import { useState } from "react";
import "./MatchList.css";

type List = {
  _embedded :{
    reservationList : [
      {
        id: string,
        orderIncrementId: string,
        itemPrice: { amount: number, currency: string },
        price: { amount: number, currency: string },
        priceIWTR: { amount: number, currency: string },
        popularityBid: { amount: number, currency: string },
        commissionRule: {
          id: string,
          ruleName: string,
          fixedAmount: number,
          percentValue: number,
        },
        sellerId: number,
        sellerName: string,
        customerId: number,
        offerId: string,
        productId: string,
        name: string,
        rowNumber: number,
        createdDate: string,
        toReleaseDate: string,
        nextAutoReleaseDate: string,
        releasedDate: string,
        releaseTryCount: number,
        releasedStockId: string,
        releasedExternalStockId: null,
        status: string,
        orderItemId: string,
        maxDeliveryDate: null,
        updatedAt: string,
      },
  ]
  }
}
type StockList = {
  _embedded: {
    stockList: [
      {
        id: string;
        productId: string;
        offerId: string;
        sellerId: 12899268;
        status: string;
        createdAt: string;
        dispatchedAt: string;
        reservationId: string;
        ktcId: string;
        content: string;
        mimeType: string;
        externalName: string;
        externalVendor: string;
        externalPrice: {
          amount: number;
          currency: string;
        };
        hidden: boolean;
      }
    ];
  };
};

export default function MatchList() {
  const [myListString, setMyListString] = useState<string>();
  const [myList, setMyList] = useState<StockList>();

  const [mixString, setMixString] = useState<string>();
  const [mixList, setMixList] = useState<List | any>();
  
  const [listMatches, setListMatches] = useState([]);
  const [total, setTotal] = useState(0);

  const [response, setResponse] = useState<any>(new Array());

  function handleMyListChange(e: any) {
    setMyListString(e.target.value)
    const parsed = JSON.parse(e.target.value)
    setMyList(parsed)
  }

  function handleMixChange(e: any) {
    setMixString(e.target.value)
    const parsed = JSON.parse(e.target.value)
    setMixList(parsed)
  }

  function getCoincidences(e: any) {
    const myListParsed = myList?._embedded.stockList
    console.log(myListParsed)
    if (myList && mixList){
      const matches = mixList?._embedded?.reservationList.filter(mixItem => myListParsed.some(myItem => myItem.reservationId === mixItem.id))
      setListMatches(matches)
      
      console.log(matches)
      let totalMoney = 0;
      matches.forEach(match => {
        totalMoney += match.priceIWTR.amount
      })
      setTotal(totalMoney/100)
    }
  }

  return (
    <div className="App" style={{width: "100%"}}>
      <div style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
        <textarea
          style={{ width: "500px", height: "500px", marginTop: "50px", color: "black" }}
          value={myListString}
          placeholder="Mis ventas"
          onChange={handleMyListChange}
        />
        <textarea
          style={{ width: "500px", height: "500px", marginTop: "50px", color: "black" }}
          value={mixString}
          placeholder="Ventas mezcladas"
          onChange={handleMixChange}
        />
      </div>
      <button onClick={getCoincidences} /* disabled={!mixState || !myListState} */>Buscar Coindicencias</button>
      {
        listMatches.length > 0 && 
      
      <div>
        <table style={{ width: "100%", border: "1px solid black" }}>
        { listMatches.length > 0 && 
          <caption>
            <h3>Cantida de coincidencias: {listMatches.length}</h3>
            <h3>Total $: {total}</h3>
          </caption>
        }
          <thead>
            <tr>
              <th>ID</th>
              <th>PRICE IWTR</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>    
            {listMatches.length > 0 && listMatches.map(match => {
              return (
                <tr>
                  <td>
                    {match.id}
                  </td>
                  <td>
                  {match.priceIWTR.currency} {match.priceIWTR.amount/100}
                  </td>
                  <td>
                    {match.name}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    }
      
    </div>
  );
}