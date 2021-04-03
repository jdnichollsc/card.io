import { Server } from "miragejs";
import data from './data'

export function startFakeBackend() {
  let server = new Server({
    routes() {
      this.namespace = "api";

      this.get("/cards", schema => {
        return schema.db.cards
      }, { timing: 2000 });

      this.get("/cards/:id/card_details", (schema, request) => {
        return schema.db.cardDetails.find(request.params.id)
      }, { timing: 1000 });

      this.get("/cards/:id/transactions", (schema, request) => {
        const cardId = parseInt(request.params.id)
        return schema.db.transactions.filter(
          (transaction) => transaction.card_id === cardId
        )
      }, { timing: 3500 });

      this.post("/cards/:id/disable", (schema, request) => {
        const cardId = parseInt(request.params.id)
        schema.db.cardDetails.update(cardId, {active: false})
        return schema.db.cards.update(cardId, {active: false})
      }, { timing: 1000 });

      this.pretender.get('data:image/*', this.pretender.passthrough);
    }
  });

  server.db.loadData(data)

  return server;
}
