
export const omaData = {
    "status": {
      // account : aktueller bargeld bestand
      "account": 43.5,
      "stock": [
        {
          // msci
          "id": "EUNL.DE",
          // Anzahl aktien vn msci world
          "value": 130
        },
        {

          "id": "XEON.DE",
          // Anzahl aktien von xtracker (quasi aktie wie bei einem festgeldkonto)
          "value": 250 
        }
      ]
},

    "event":
    [
      {
        "date": "27.10.23",
        "cash": 10000
      },
      {
        "date": "2.11.23",
        "stock": {
          "value": 76.684,
          "id": "EUNL.DE",
          "count": 130
        }
      },
      {
        "date": "16.1.24",
        "cash": 35000
      },
      {
        "date": "22.1.24",
        "stock": {
          "value": 139.91,
          "id": "XEON.DE",
          "count": 214
        }
      },
      {
        "date": "6.2.24",
        "stock": {
          "value": 140.19,
          "id": "XEON.DE",
          "count": 36
        }
      }
    ]
  }