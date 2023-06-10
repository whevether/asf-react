// 定义一个递归函数，用于遍历整棵树并查找子节点的所有父节点
export const findParentIds = (dataSource, nodeId) => {
  const parentIds = []; //
  const traverse = (node, nodeId) => {
    if (node.parentId === nodeId) { // 如果当前节点的ID等于子节点的ID，则表示已经找到了子节点，可以开始向上查找父节点
      return true; // 返回true表示已经找到了子节点
    }

    if (node.children) { // 如果当前节点有子节点，则继续遍历子节点
      for (const childNode of node.children) {
        if (traverse(childNode, nodeId)) { // 如果在子节点中找到了子节点的父节点，则将当前节点的ID添加到父节点ID数组中，并返回true表示已经找到了子节点
          parentIds.push(node.key);
          return true;
        }
      }
    }

    return false; // 如果当前节点不是子节点的父节点，则返回false
  };
  // 从根节点开始遍历整棵树，并调用递归函数查找子节点的所有父节点
  for (const node of dataSource) {
    if (traverse(node, nodeId)) { // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
      break;
    }
  }
  return parentIds; // 返回所有父节点ID的数组
};
export const isImage = (url)=>{
  let arr = ['.bmp','.jpg','.png','.tif','.gif','.pcx','.tga','.exif','.fpx','.svg','.psd','.cdr','.pcd','.dxf','.ufo','.eps','.ai','.raw','.WMF','.webp','.avif','.apng','.jpeg'];
  let result = false;
  for(let item  of arr){
    if(url.endsWith(item)){
      result = true;
      break;
    }
  }
  return result;
};
export const isVideo = (url)=>{
  let arr = ['.mp4','.wav','.flv','.mkv','.mov','.ogg'];
  let result = false;
  for(let item  of arr){
    if(url.endsWith(item)){
      result = true;
      break;
    }
  }
  return result;
};