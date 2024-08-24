class GlobalVariables {
  static bounds = { maxX: 0, minX: 0, maxY: 0, minY: 0 };
  static graphScale = { scale: 1 };
  static screenDimensions = { height: 600, width: 800 };
  static gl: WebGL2RenderingContext;
  static shaders = {
    line: {
      fragmentShader: null as WebGLShader | null,
      vertexShader: null as WebGLShader | null,
    },
    box: {
      fragmentShader: null as WebGLShader | null,
      vertexShader: null as WebGLShader | null,
    },
  };
  static program = {
    line: null as WebGLProgram | null,
    box: null as WebGLProgram | null,
  };
  static vao = {
    line: null as WebGLVertexArrayObject | null,
    box: null as WebGLVertexArrayObject | null,
  };
  static canvas: HTMLCanvasElement = null as any;
  static showGrid = true;
  static attribLength = {
    line: {
      vertex: 0,
    },
    box: { vertex: 0, color: 0 },
  };
  static liveCells: Set<string> = new Set([
    '-5,6',
    '-4,6',
    '3,6',
    '4,6',
    '-6,5',
    '-4,5',
    '3,5',
    '5,5',
    '-6,4',
    '5,4',
    '-9,3',
    '-8,3',
    '-6,3',
    '5,3',
    '7,3',
    '8,3',
    '-9,2',
    '-8,2',
    '-6,2',
    '-4,2',
    '-1,2',
    '0,2',
    '3,2',
    '5,2',
    '7,2',
    '8,2',
    '-6,1',
    '-4,1',
    '-2,1',
    '1,1',
    '3,1',
    '5,1',
    '-6,0',
    '-4,0',
    '-2,0',
    '1,0',
    '3,0',
    '5,0',
    '-9,-1',
    '-8,-1',
    '-6,-1',
    '-4,-1',
    '-1,-1',
    '0,-1',
    '3,-1',
    '5,-1',
    '7,-1',
    '8,-1',
    '-9,-2',
    '-8,-2',
    '-6,-2',
    '5,-2',
    '7,-2',
    '8,-2',
    '-6,-3',
    '5,-3',
    '-6,-4',
    '-4,-4',
    '3,-4',
    '5,-4',
    '-5,-5',
    '-4,-5',
    '3,-5',
    '4,-5',
  ]);
  static speed = 98;
  static generationCount = 0;
  static maxSpeed = 100;
  static boxColor = [255, 255, 255];
  static gridColor = [50, 50, 50];
  static backgroundColor = [0, 0, 0];
  static rules: Map<number, boolean[]> = new Map([
    [2, [true, true]],
    [3, [true, false]],
  ]);
  static backendUrl = 'https://conwaysinfinite.onrender.com/api/v1';
}
export default GlobalVariables;
