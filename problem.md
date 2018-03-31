# Programming Exercise

In this exercise, you will create an image processing service for a service like Instagram.


## Background

Users who post photos often upload huge images (2MB-10MB) taken with megapixel cameras. But, viewers of websites on phones prefer smaller, compressed image sizes (20KB - 100KB) to improve load times and conserve bandwidth.


## Problem

Write a microservice that will synchronously return images after compression:


Sample request:
```
POST my-image-service.com/compress?url=http%3A%2F%2Fexample.com%2Fimages%2Flarge-image-123.png&height=640&width=480
```
Sample response:
```
Headers:
  Content-type: ‘image/jpeg’
  X-butteraugli: <score>

Body:
  <Processed Image>
```

(A) It will take an input of an image URL (B) fetch the image over HTTP and (C) performs compression and resizing, (D) returns the image in the response body, along with content-type and quality score.


## Quality score

To measure the perceptible difference between an image and it’s lossy compressed version, use a tool like [Butteraugli](https://github.com/google/butteraugli) to inform the requestor how much perceptible difference exists between images.


## Requirements


1.  Assume the query params must always have `url` defined
2.  Assume the query params may have `height` and/or `width`. If height or width are defined, the image must be resized to have a maximum height and maximum width without losing the original aspect ratio.
3.  The input image must be compressed lossily. You can use any library of your choice (imagemin on node.js, for example)
4.  You can choose any image compression technique you like, including [JPEGtran](https://github.com/imagemin/imagemin-jpegtran), [webp](https://github.com/imagemin/imagemin-webp) or any other heuristic you may choose ti. A sophisticated approach might try many algorithms in parallel for each input request, and choose the one most appropriate for this image given a minimum butteraugli score.

## Evaluation

This is a problem that can be implemented in many different ways. You may choose to use any programmatic tools and work in any language or framework you prefer. Using third-party tools like Cloudinary or tinyjpg.com as a part of your final solution is not allowed (although you may choose to read about how they work and compare your performance against theirs).


You are entirely welcome to ask questions that may determine what considerations you optimize for, between request time, output image quality, or overall design considerations.
