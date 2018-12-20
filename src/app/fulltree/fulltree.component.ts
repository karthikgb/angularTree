import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from '../TreeModule/angular-tree-component';
import { TreeService } from '../tree.service';
import { EntityTypes, IconJson, blobUrl } from '../Model/EntityType';

const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      // alert(`context menu for ${node.data.name}`);

    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    },
    click: (tree, node, $event) => {
      // console.log(tree);
      if ($event.target.className == "toggle-children") {
        return;
      }
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-fulltree',
  styleUrls: ['./fulltree.component.css'],
  templateUrl: './fulltree.component.html'
})
export class FullTreeComponent implements OnInit, AfterViewInit {
  nodes: any[];
  asyncChildren = new Array(4).fill(null).map((item, n) => ({
    EntityName: 'async child2.' + n,
    subTitle: 'async child ' + n,
    hasChildren: n < 5
  }));
  customTemplateStringOptions: ITreeOptions = {
    displayField: 'EntityName',
    isExpandedField: 'expanded',
    idField: 'EntityId',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: (node) => {
      // console.log('allowDrag?');
      return true;
    },
    allowDrop: (node) => {
      this.slotheight = "2px;"
      // console.log('allowDrop?');
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  };
  constructor(private treeService: TreeService) {
  }
  ngOnInit() {
    // setTimeout(() => {
    //   this.nodes = 
    // }, 1);
  }
  get state() {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }
  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }

   isEven(n) {
    return n % 2 == 0;
 }

  slotheight = "0px";

  slotOnDrag(ev) {
    this.slotheight = "2px";
  }


  slotOnDrop(ev) {
    this.slotheight = "0px";
  }

  ngAfterViewInit() {
    this.showConfig();
  }

  showConfig() {
    this.treeService.getConfig()
      .subscribe((data: any) => {
        console.log(data)
        this.nodes = data;
      });
  }

  getChildren(node: TreeNode) {
    return new Promise((resolve, reject) => {
      return this.treeService.getAsyncData().subscribe((data: any) => {
        resolve(data);
      })
    });
  }


  toddle: boolean = false;
  dummy() {
    this.toddle = !this.toddle
  }

  onDrop($event, node) {
    node.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: node, index: node.index }
    });
  }

  allowDrop(element, $event) {
    return element.options.allowDrop(element, { parent: element, index: element.index }, $event);
  }

  addNode(tree: any) {
    this.nodes[0].children.push({
      EntityName: 'a new child'
    });
    tree.treeModel.update();
    console.log(this.nodes);
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text: string, tree: any) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree: any) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  onEvent(event: any) {
    // console.log(event);
  }

  onInitialized(tree: any) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event: any) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel: TreeModel) {
    console.log(treeModel.activeNodes);
  }


  getIcon(entityType) {
    try {
      let icon
      switch (entityType) {
        case EntityTypes.ORIFICE:
        case EntityTypes.TURBINE:
        case EntityTypes.GASWELL:
        case EntityTypes.INVENTORYSTORAGE:
        case EntityTypes.TANK:
        case EntityTypes.NONMETERED:
        case EntityTypes.TRUCKTICKET:
        case EntityTypes.GASBATTERY:
        case EntityTypes.OILBATTERY:
        case EntityTypes.DISTRICT:
        case EntityTypes.AREA:
        case EntityTypes.FIELD:
        case EntityTypes.PAD:
        case EntityTypes.SATELLITE:
        case EntityTypes.PLANT:
        case EntityTypes.GASPLANT:
        case EntityTypes.RISER:
        case EntityTypes.HEADER:
        case EntityTypes.TREATER:
        case EntityTypes.FFV:
        case EntityTypes.CORIOLIS_METER:
        case EntityTypes.WATERINJECTION:
        case EntityTypes.ROTAMETER:
        case EntityTypes.PDMETER:
        case EntityTypes.GASWELL:
        case EntityTypes.GASWELLPRODUCINGOIL:
        case EntityTypes.GASINJECTIONWELL:
        case EntityTypes.WATERINJECTIONFACILITY:
        case EntityTypes.WATERINJECTIONWELL:
        case EntityTypes.GASDISPOSALWELL:
        case EntityTypes.TRUCKTERMINAL:
        case EntityTypes.WATERDISPOSALWELL:
        case EntityTypes.WATERSOURCEFACILITY:
        case EntityTypes.WATERSOURCEWELL:
        case EntityTypes.STEAMINJECTION:
        case EntityTypes.OILWELL:
        case EntityTypes.SEPARATOR:
        case EntityTypes.THETER:
        case EntityTypes.WASTEFACILTY:
        case EntityTypes.TREATINGFACILTY:
        case EntityTypes.BOOSTERSTATION:
        case EntityTypes.METERSTATION:
        case EntityTypes.COMPRESSOR:
        case EntityTypes.ULTRASONIC:
        case EntityTypes.PUMP:
        case EntityTypes.PUMPJACK:
        case EntityTypes.COMPRESSORSTATION:
        case EntityTypes.TRUCK:
        case EntityTypes.GasINJECTIONFACILTY:
          icon = IconJson[entityType];
          break;

        case EntityTypes.People:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/PersonIndividual_expanded.svg";
            break;
          }
        case EntityTypes.PEOPLECATEORY:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/Category_expanded.svg";
            break;
          }
        case EntityTypes.COMPANY:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/Company_expanded.svg";
            break;
          }
        case EntityTypes.GROUP:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/TeamGroup_expanded.svg";
            break;
          }
        case EntityTypes.Person:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/PersonIndividual_expanded.svg";
            break;
          }
        case EntityTypes.IdeasCategory:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/PF_Category_expanded.svg";
            break;
          }
        case EntityTypes.Drawings:
          {
            icon = "https://althingsblob.blob.core.windows.net/icons/PF_Drawing_expanded.svg";
            break;
          }

        case EntityTypes.DashBoard: {
          icon = "https://althingblob.blob.core.windows.net/icons/BI_Circle_Icon_47x47.svg";
          break;
        }
        case EntityTypes.Category: {
          icon = "https://althingsblob.blob.core.windows.net/icons/BICategory_Icon_47x47.svg";
          break;
        }
        case EntityTypes.TaskCategory:
          {
            icon = blobUrl.taskFabric + 'Tasks_Category_Icon.svg';
            break;
          }
        case EntityTypes.Collection:
          {
            icon = blobUrl.taskFabric + 'Tasks_Board_Icon.svg';
            break;
          }
        case EntityTypes.List:
          {
            icon = blobUrl.taskFabric + 'Tasks_List_Icon.svg';
            break;
          }
        case EntityTypes.Task:
          {
            icon = blobUrl.taskFabric + 'Tasks_SingleTask_Icon.svg';
            break;
          }
        default:
          {
            icon = "wwwroot/images/All FDC Icons 47x47 24.05.2018/Header_Icon_47x47.svg";
            break;
          }
      }
      icon = "/assets/" + icon;
      return icon;
    } catch (e) {
      console.error('Exception in getIcon() of CapabilityTreeComponent  at time ' + new Date().toString() + '. Exception is : ' + e);
    }
  }

  getColor(d) {
    let color = "red";
    if (d.formValidate) {
      color = 'none';
    }
    else {
      color = "red"
    }
    return color;
  }

}
