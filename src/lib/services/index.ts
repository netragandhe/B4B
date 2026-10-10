import { bulletinService } from './bulletinService'
import { territoryService } from './territoryService'
import { clientService } from './clientService'
import { billingService } from './billingService'
import { scoreboardService } from './scoreboardService'
import { storage } from '../storage'

export * from './bulletinService'
export * from './territoryService'
export * from './clientService'
export * from './billingService'
export * from './scoreboardService'

export function resetAllDemoData() {
  storage.clearAll()
  bulletinService.reset()
  territoryService.reset()
  clientService.reset()
  billingService.reset()
  scoreboardService.reset()
}
