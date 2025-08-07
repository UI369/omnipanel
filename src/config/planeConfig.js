export const PLANE_CONFIG = {
  ratio: 1.6,
  baseWidth: 8,
  borderWidth: 0.4,
  verticalTiles: 10,
  
  layers: {
    border: -0.002,
    plane: 0,
    grid: 0.001
  },
  
  get planeHeight() { 
    return this.baseWidth / this.ratio 
  },
  
  get borderPlaneWidth() { 
    return this.baseWidth + (this.borderWidth * 2) 
  },
  
  get borderPlaneHeight() { 
    return this.planeHeight + (this.borderWidth * 2) 
  },
  
  get tileSize() { 
    return this.planeHeight / this.verticalTiles 
  },
  
  get horizontalTiles() { 
    return Math.floor(this.baseWidth / this.tileSize) 
  },
  
  get gridOffsetX() { 
    const totalGridWidth = this.horizontalTiles * this.tileSize;
    const leftoverSpace = this.baseWidth - totalGridWidth;
    return leftoverSpace / 2;
  }
};