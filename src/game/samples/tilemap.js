import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import Tilemap from 'engine/tilemap';

import { TEXTURES, MAP } from 'game/data';

class TilemapSample extends Scene {
  constructor() {
    super();

    const tilesets = {
      'tileset.png': TEXTURES['tileset'],
    };

    Tilemap.fromTiledJson(MAP, tilesets).addTo(this.stage);
  }
}

engine.addScene('Tilemap', TilemapSample);
