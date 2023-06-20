import { ShipAI } from "../control"
import { ShipEntity } from "../ship/ShipEntity"
import { makeShipModel } from "../ship/makeShipModel"
import { store } from "../store/Store"

let id = 0

export function createAIShip(data) {
  const shipEntity = new ShipEntity({
    model: makeShipModel(Math.random().toString()),
    id: `ai-${id++}`
  })
  const ship = new ShipAI(shipEntity)
  shipEntity.model.position.setX(data.x || 0)
  shipEntity.model.position.setY(data.y || 0)
  shipEntity.model.position.setZ(3)
  store.modules.ships.add(ship)

  return ship
}