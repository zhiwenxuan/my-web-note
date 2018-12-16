<template>
    <div id="colormap">
        <el-select v-model="currentCM" class="colormap-select" @change="initColors">
            <el-option v-for="(cm, index) in colormaps" :key="index" :value="cm"></el-option>
        </el-select>
        <input type="file" @change="onImageFileChange"/>
        <!-- <input type="button" value="热感化" @click="Convert256toType"/> -->
        <input type="button" value="热感化" @click="getOriginImageData"/>
        <input type="button" value="danci" @click="initBlob"/>
        <input type="button" value="保存" @click="saveAllFiles"/>
        <div class="to-gray-w">
            <div class="scream">
                <img id="scream" alt="Image preview..." :src="imgUrl">
            </div>
            <canvas id="canvas" width="336px;" height="256px;">
                your browser does not support canvas!
            </canvas>
        </div>
        <div id="test-colormap">
            <el-button @click="test">test</el-button>
        </div>
    </div>
</template>
<script>
import JSZip from "jszip";
import FileSaver from "file-saver";

let cmap = require('colormap');
var c_w = 336; var c_h = 256;
let originImageData;
export default {
    data(){
        return {
            colors: [],
            img_w: 400,
            img_h: 300,
            currentCM: 'jet',
            colormaps: [
                'jet', 'hsv','hot','cool','spring','summer','autumn','winter','bone',
                'copper','greys','YIGnBu','greens','YIOrRd','bluered','RdBu','picnic',
                'rainbow','portland','blackbody','earth','electric',

                'viridis', 'inferno', 'magma', 'plasma', 'warm', 'rainbow-soft',

                'bathymetry', 'cdom', 'chlorophyll', 'density', 'freesurface-blue', 'freesurface-red', 'oxygen', 'par', 'phase', 'salinity', 'temperature', 'turbidity', 'velocity-blue', 'velocity-green',

                'cubehelix'
            ],
            imgUrl: require('../assets/images/00_DJI_0126.jpg'),
            imgDom: null,
            canvasDom: null,
            imgBaseName: '00_DJI_0126.jpg',
            allImageData: [],
            index: 0
        }
    },
    mounted() {
        this.initColors();
    },
    methods: {
        //定时器，单位为毫秒
        timeout(ms) {
            return  new Promise(resolve => {
                setTimeout(resolve, ms);
            })
        },
        //初始化一个img DOM，如果不存在则创建一个img DOM
        initImgDom() {
            if(this.imgDom){
                return this.imgDom;
            }
            return this.imgDom = new Image();
        },
        //初始化一个canvas，如果不存在则创建一个
        initCanvasDom() {
            if(this.canvasDom) {
                return this.canvasDom;
            }
            return this.canvasDom = document.createElement('canvas');
        },
        //初始化colors
        initColors(type) {
            this.colors = cmap({
                colormap: type,
                nshades: 256,
                format: 'rgb',
                alpha: 1
            })
        },
        //图片加载完毕回调
        loadImgCallback() {
            this.initImgDom();
            return new Promise( (resolve, reject) => {
                this.imgDom.src = this.imgUrl;
                this.imgDom.onload = function() {
                    resolve();
                }
            })
        },
        //将图片写入画布并获取图片数据
        getOriginImageData() {
            this.loadImgCallback().then(async () => {
                this.initCanvasDom();
                this.canvasDom.width = this.imgDom.width;
                this.canvasDom.height = this.imgDom.height;
                let ctx = this.canvasDom.getContext('2d');
                ctx.drawImage(this.imgDom, 0, 0);
                originImageData = ctx.getImageData(0, 0, this.canvasDom.width, this.canvasDom.height);
                console.log(originImageData)
                let imageData = this.convertDataByType(originImageData, this.currentCM);
                this.showImageByData(imageData)
                // console.log(this.allImageData)
            });
        },
        initBlob() {
            let timer = window.setInterval( async () => {
                if(this.index >= this.colormaps.length){
                    console.log(this.allImageData)
                    return console.log('index over')
                }
                let cmType = this.colormaps[this.index];
                let imageData = this.convertDataByType(originImageData, cmType);
                let blob = await this.initAllImageData(imageData, cmType);
                this.allImageData.push({
                    cmType,
                    imageData:blob
                })
                console.log(this.index++);
            }, 2000);
            if(this.index >= this.colormaps.length) {
                window.clearInterval(timer);
            }
        },
        convertDataByType(originData, type) {
            this.initColors(type);
            let imgData = originData;
            for (var i=0; i<imgData.data.length; i+=4) {
                var R = this.colors[ imgData.data[i] ][0]; //R(0-255)
                var G = this.colors[ imgData.data[i+1] ][1]; //G(0-255)
                var B = this.colors[ imgData.data[i+2] ][2]; //G(0-255)
                var Alpha = imgData.data[i+3]; //Alpha(0-255)
                imgData.data[i] = R;
                imgData.data[i+1] = G; 
                imgData.data[i+2] = B; 
                imgData.data[i+3] = Alpha; 
            }
            return imgData;
        },
        //初始化所有image data
        initAllImageData(data, cmType) {
            return new Promise((resolve) => {
                this.initCanvasDom();
                let c = this.canvasDom;
                c.width = this.imgDom.width;
                c.height = this.imgDom.height;
                let ctx = c.getContext('2d');
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.putImageData(data, 0, 0);
                c.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpg', 1)
            })
            
        },
        //根据imageData展示图片
        showImageByData(data) {
            let c = document.getElementById('canvas');
            c.width = this.imgDom.width;
            c.height = this.imgDom.height;
            let ctx = c.getContext('2d');
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.putImageData(data, 0, 0);
            let url = c.toDataURL('image/jpg', 1);
            let filename = this.currentCM + '_' + this.imgBaseName;
            this.saveFile(url, filename);
        },
        //保存文件到本地
        saveFile(imgUrl, filename) {
            console.log('in save file')
            let link = document.createElement('a');
            link.href = imgUrl;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href);
            console.log('in save file end')
        },
        //保存所有文件
        saveAllFiles() {
            let that = this;
            let zip = new JSZip();
            this.allImageData.forEach((item) => {
                zip.file(item.cmType + '_' + this.imgBaseName, item.imageData);
            })
            zip
              .generateAsync({ type: "blob" }, function(metadata) {
                // you can handle progress here.
              })
              .then(function(blob) {
                FileSaver.saveAs(blob, `${that.imgBaseName}_proccessed_images.zip`);
              });
        },









        onImageFileChange() {
            this.loadImg();
        },
        loadImg(){
            var img = document.getElementById("scream");
            console.log(img)
            var file = document.querySelector('input[type=file]').files[0];
            if(!file) {return}
            console.log(file)
            if(!/image\/\w+/.test(file.type)){
                alert("文件必须为图片！");
                return false;
            }
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                img.src = reader.result;
            }, false);
            if(file) {
                reader.readAsDataURL(file);
                this.loadCanvas();
            }
        },
        loadCanvas(){
            var c = document.getElementById("canvas");
            var ctx = c.getContext("2d");
            var img = document.getElementById("scream");
            img.onload = function() {
                ctx.drawImage(img,0,0,c_w,c_h);
            } 
        },
        //转为热感图片
        Convert256toType(){
            var c = document.getElementById("canvas");
            var ctx = c.getContext("2d");
            var imgData = ctx.getImageData(0,0,c_w,c_h);
            console.log('Before handle: ')
            console.log(imgData)
            for (var i=0; i<imgData.data.length; i+=4) {
                var R = this.colors[ imgData.data[i] ][0]; //R(0-255)
                var G = this.colors[ imgData.data[i+1] ][1]; //G(0-255)
                var B = this.colors[ imgData.data[i+2] ][2]; //G(0-255)
                var Alpha = imgData.data[i+3]; //Alpha(0-255)
                imgData.data[i] = R;
                imgData.data[i+1] = G; 
                imgData.data[i+2] = B; 
                imgData.data[i+3] = Alpha; 
            }
            console.log('After handle: ')
            console.log(imgData)
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.putImageData(imgData,0,0);
        },











        Convert256toGray(){
            var c = document.getElementById("canvas");
            var ctx = c.getContext("2d");
            var imgData = ctx.getImageData(0,0,c_w,c_h);
            console.log('Before handle: ')
            console.log(imgData)
            for (var i=0; i<imgData.data.length; i+=4) {
                var R = imgData.data[i]; //R(0-255)
                var G = imgData.data[i+1]; //G(0-255)
                var B = imgData.data[i+2]; //G(0-255)
                var Alpha = imgData.data[i+3]; //Alpha(0-255)
                //浮点算法
                var gray = 0.2989 * R + 0.5870 * G + 0.1140 * B;
                //整数算法
                //  var gray = (R*299 + G*587 + B*114 + 500) / 1000;　
                //移位算法
                //  var gray =(R*76+G*151+B*28)>>8;
                //平均值算法
                //   var gray = (R+G+B)/3;
                //仅取绿色
                //  var gray=G;
                imgData.data[i] = gray;
                imgData.data[i+1] = gray; 
                imgData.data[i+2] = gray; 
                imgData.data[i+3] = Alpha; 
            }
            console.log('After handle: ')
            console.log(imgData)
            ctx.putImageData(imgData,0,0);
        },
        test() {
            let wrap = document.getElementById('test-colormap');
            var img = wrap.appendChild(document.createElement('img')),
            canvas = wrap.appendChild(document.createElement('canvas')),
            c = canvas.getContext('2d'),
            n = 256,
            colormaps = [
                'jet', 'hsv','hot','cool','spring','summer','autumn','winter','bone',
                'copper','greys','YIGnBu','greens','YIOrRd','bluered','RdBu','picnic',
                'rainbow','portland','blackbody','earth','electric',

                'viridis', 'inferno', 'magma', 'plasma', 'warm', 'cool', 'rainbow-soft',

                'bathymetry', 'cdom', 'chlorophyll', 'density', 'freesurface-blue', 'freesurface-red', 'oxygen', 'par', 'phase', 'salinity', 'temperature', 'turbidity', 'velocity-blue', 'velocity-green',

                'cubehelix'
            ];

            img.width = 480;
            img.onload = run;
            img.src = require('../assets/images/banner/banner1.jpg');

            function drawColorMaps (colormap, name, height) {
                /*
                * Build up the color ranges and add text
                */
                for (var j = 0; j < n; j++) {
                    c.fillStyle = colormap[j];      // start ind at index 0
                    c.fillRect(j*10, height, 10, 40);
                }
                c.fillStyle = '#262626';
                c.font = '16px Helvetica';
                c.fillText( name, n*10 + 10, height + 26);
            }

            function run() {
                var height, colormap;
                c.canvas.height = colormaps.length * 40 + img.height;
                c.canvas.width = 648;

                for (var i = 0; i < colormaps.length; i++) {
                    height = i*40;
                    colormap = cmap({
                        colormap: colormaps[i],
                        nshades: n,
                        format: 'rgbaString'
                    });
                    drawColorMaps(colormap, colormaps[i], height);
                }

                /*
                * Now lets try some alpha maps overtop an image!
                */
                var ilast = i;
                c.drawImage(img, 0, i*40, 480, 240);

                // remove background img
                img.parentElement.removeChild(img);

                for (var i = 0; i < colormaps.length; i++) {
                    height = (ilast + i)*40;
                    colormap = cmap({
                        colormap: colormaps[i],
                        nshades: n,
                        format: 'rgbaString',
                        alpha: [0, 1]
                    });
                    drawColorMaps(colormap, colormaps[i] + ' with transparency', height);
                }
            }

        }
    }
}
</script>
<style scoped>
    #colormap {
        position: relative;
        text-align: center;
        margin-top: 60px;
        overflow: auto;
    }
    .to-gray-w {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 60px 0;
    }
    .scream{
        width:auto;
        height:auto;
        border: 1px solid;
        margin-right: 100px;
    }
    #canvas{
        border: 1px dashed;
    }
    #test-colormap {
    }
    .colormap-select {
        margin-right: 40px;
    }
</style>
