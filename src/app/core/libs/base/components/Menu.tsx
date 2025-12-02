

export function useMenuBuilder(){
 
    const buildMenu = (pid: number, sourceMenu: any): any[] => {
       const findChildren = (id: number) => {
      return sourceMenu
        ? sourceMenu.filter((item) => item.pid === id )
        : [];
    };
      let children = findChildren(pid);
      if (children.length === 0) {
        return undefined;
      }
      return children.map((v: any) => {
        return {
          label: v.name,
          pid: v.pid,
          id: v.id,
          name_json: v.name_json,
          path: v.path,
          icon: v.icon,
          status: v.status,
          children: buildMenu(v.id, sourceMenu),
          sort_num: v.sort_num,
        };
      });
    };
  return {
    buildMenu
  }
}