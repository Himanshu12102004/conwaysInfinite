class GlobalVariables {
}
GlobalVariables.bounds = { maxX: 0, minX: 0, maxY: 0, minY: 0 };
GlobalVariables.graphScale = { scale: 1 };
GlobalVariables.screenDimensions = { height: 600, width: 800 };
GlobalVariables.shaders = {
    line: {
        fragmentShader: null,
        vertexShader: null,
    },
    box: {
        fragmentShader: null,
        vertexShader: null,
    },
};
GlobalVariables.program = {
    line: null,
    box: null,
};
GlobalVariables.vao = {
    line: null,
    box: null,
};
GlobalVariables.canvas = null;
GlobalVariables.showGrid = true;
GlobalVariables.attribLength = {
    line: {
        vertex: 0,
    },
    box: { vertex: 0, color: 0 },
};
GlobalVariables.liveCells = new Set([
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
GlobalVariables.speed = 98;
GlobalVariables.generationCount = 0;
GlobalVariables.maxSpeed = 100;
GlobalVariables.boxColor = [255, 255, 255];
GlobalVariables.gridColor = [50, 50, 50];
GlobalVariables.backgroundColor = [0, 0, 0];
GlobalVariables.rules = new Map([
    [2, [true, true]],
    [3, [true, false]],
]);
GlobalVariables.backendUrl = 'https://conwaysinfinite.onrender.com/api/v1';
export default GlobalVariables;
