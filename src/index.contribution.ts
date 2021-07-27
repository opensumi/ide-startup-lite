import { Autowired } from '@ali/common-di';
import { Domain, ComponentContribution, ComponentRegistry, getIcon, CommandContribution, CommandRegistry, ClientAppContribution, Command, URI, CommandService, TabBarToolbarContribution, IToolbarRegistry, ToolbarRegistry } from '@ali/ide-core-browser';
import { IStatusBarService } from '@ali/ide-status-bar';
import { IWorkspaceService } from '@ali/ide-workspace';
import { IFileServiceClient } from '@ali/ide-file-service';
import { IMainLayoutService } from '@ali/ide-main-layout';
import { TestView } from './index.view';

const REFRESH: Command = {
  id: 'test.refresh',
  iconClass: getIcon('refresh'),
  label: '刷新视图',
};

@Domain(ClientAppContribution, ComponentContribution, CommandContribution, TabBarToolbarContribution)
export class SampleContribution implements ClientAppContribution, ComponentContribution, CommandContribution, TabBarToolbarContribution {

  @Autowired(IStatusBarService)
  statusBarService: IStatusBarService;

  @Autowired(IWorkspaceService)
  workspaceService: IWorkspaceService;

  @Autowired(IFileServiceClient)
  fileServiceClient: IFileServiceClient;

  @Autowired(IMainLayoutService)
  layoutService: IMainLayoutService;

  onDidStart() {
    this.layoutService.toggleSlot('right', true, 500);
  }

  registerToolbarItems(registry: ToolbarRegistry) {
    registry.registerItem({
      id: 'refresh_view',
      command: REFRESH.id,
      iconClass: getIcon('refresh'),
      label: '刷新视图',
      viewId: 'test',
    });
  }

  // 注册视图和token的绑定关系
  registerComponent(registry: ComponentRegistry) {
    registry.register('test-view', [
      {
        id: 'test',
        component: TestView,
        name: '预览视图',
      },
    ], {
      containerId: 'test',
      title: '测试视图',
      priority: 6,
      iconClass: getIcon('browser-preview'),
    });
  }

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(REFRESH, {
      execute: () => {
        alert('try refresh!');
      }
    });
  }

}
