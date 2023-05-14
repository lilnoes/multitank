export function getSocketID(scene) {
  const socket = scene.registry.get("socket");
  const ID = scene.registry.get("ID");
  return [socket, ID];
}
