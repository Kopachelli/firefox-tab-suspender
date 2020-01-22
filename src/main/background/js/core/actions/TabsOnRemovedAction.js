import Injector from '~/main/background/js/infrastructure/injector/Injector';
import EventType from '~/main/background/js/core/data/EventType';
import HeapType from '~/main/background/js/core/data/HeapType';
import IAction from '~/main/background/js/infrastructure/parents/IAction';
import WasmService from '~/main/background/js/core/services/WasmService';
import CFunctionsProvider
  from '~/main/background/js/core/providers/CFunctionsProvider';

export default @Injector.register([WasmService, CFunctionsProvider])
class TabsOnRemovedAction extends IAction {
  constructor (wasmService, cFunctionsProvider) {
    super();
    this._wasmService = wasmService;
    this._cFunctionsProvider = cFunctionsProvider;
  }

  run (tabId, windowId) {
    this._wasmService.passArrayToWasm(
      EventType.TABS_ON_REMOVED,
      this._cFunctionsProvider.cPushEvent.bind(this._cFunctionsProvider),
      [windowId, tabId],
      HeapType.HEAP32,
    );
  }
}
