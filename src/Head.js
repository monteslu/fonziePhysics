define([
  'dcl',
  'dcl/bases/Mixer',
  'frozen/box2d/CircleEntity',
  'frozen/plugins/loadImage!images/head.png'
], function(dcl, Mixer, Circle, headImg){

  'use strict';

  return dcl([Mixer, Circle], {

    draw: dcl.superCall(function(sup){
      return function(ctx, scale){
        scale = scale || this.scale || 1;

        ctx.save();
        ctx.translate(this.x * scale, this.y * scale);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x) * scale, -(this.y) * scale);
        ctx.drawImage(headImg, this.x * scale - (headImg.width / 2), this.y * scale - (headImg.height / 2));
        ctx.restore();

      };
    })
  });


});