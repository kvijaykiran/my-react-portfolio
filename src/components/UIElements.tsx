import { AdvancedDynamicTexture, Slider, TextBlock, Control, Rectangle } from '@babylonjs/gui';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deg2Rad, rad2Deg } from '../Utils';
import { setSliderPVFovVal, setClipPlaneV } from '../redux/uiSlice';
import { Plane, Scene } from '@babylonjs/core';

interface UIElementsProps {
    scene: Scene;
    guiTexture: AdvancedDynamicTexture;
  }



const UIElements: React.FC<UIElementsProps> = ({scene, guiTexture}) => {
    const dispatch = useDispatch<AppDispatch>();

    // get current selected menu item ID via redux store
    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    const pvSliderFovVal = useSelector((state: RootState) => state.ui.sliderval_pvfov);
    const clipPlaneVertVal = useSelector((state: RootState) => state.ui.clipplaneval_v);
    //console.log("current selected menu item: ", selectedMenuItem);
   
    // guiContainer rectangle
    useEffect(() => {


    },[]);

    useEffect(() => {
        
        // If selected, dispose other UI elements and activate 
        // Perspective view (i.e., FOV angle, front and rear clipping plane)
        if(selectedMenuItem === 'Perspective View') {
            const pvCleanup = PerspectiveView(scene, guiTexture, pvSliderFovVal, clipPlaneVertVal, dispatch);
            return pvCleanup;
        }

        // If selected, dispose other UI elements and activate 
        // Orthographic view

        // If selected, dispose orthographic view if existing and activate perspective view and 
        // Lerp, slerp, Quat interpolated views

    

    }, [dispatch, guiTexture, selectedMenuItem, pvSliderFovVal, setClipPlaneV]);

    return null;

};

// Update code with using a different transform panel: https://playground.babylonjs.com/#9M6M2I
// perspective view function
const PerspectiveView = (scene: Scene, guiTexture: AdvancedDynamicTexture, sliderVal: number, clipPlaneVertVal: number, dispatch: AppDispatch) => {
    //const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const guiContainer = new Rectangle();
    guiContainer.width = "300px";
    guiContainer.heightInPixels = 120;
    guiContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    guiContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    guiContainer.top = "20px";
    guiContainer.background = "black";
    guiContainer.alpha = 0.7;
    guiTexture.addControl(guiContainer);

    // // Vertical clip Slider label
    // const clipSliderLabelV = new TextBlock();
    // clipSliderLabelV.text = 'Vertical Clip Plane';
    // clipSliderLabelV.heightInPixels = 140;
    // clipSliderLabelV.color = "white";
    // clipSliderLabelV.fontSize = 12;
    // clipSliderLabelV.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    // guiContainer.addControl(clipSliderLabelV);

    // // Vertical clip Slider
    // const clipVSlider = new Slider();
    // clipVSlider.minimum = -35;
    // clipVSlider.maximum = 35;
    // clipVSlider.value = clipPlaneVertVal;
    // clipVSlider.paddingTopInPixels = -40;
    // clipVSlider.heightInPixels = 20;
    // clipVSlider.width = '200px';
    // clipVSlider.color = "white";
    // clipVSlider.paddingBottomInPixels = 45;
    // clipVSlider.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    // clipVSlider.onValueChangedObservable.add((value) => {
    //     //scene.clipPlane = new Plane(0, 1, 0, clipPlaneVertVal);
    //     dispatch(setClipPlaneV(value));
    //     //fovSliderLabel.text = `Camera FOV: ${rad2Deg(sliderVal).toFixed(1)}°°`;
    // });
    // guiContainer.addControl(clipVSlider);

    // Slider label
    const subtitleLabel = new TextBlock();
    subtitleLabel.text = "Perspective View";
    subtitleLabel.heightInPixels = 140;
    subtitleLabel.color = "white";
    subtitleLabel.fontSize = 14;
    subtitleLabel.fontStyle = "bold";
    subtitleLabel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    guiContainer.addControl(subtitleLabel);

    // Slider label
    const fovSliderLabel = new TextBlock();
    fovSliderLabel.text = `Camera FOV: ${rad2Deg(sliderVal).toFixed(1)}°`;
    fovSliderLabel.heightInPixels = 60;
    fovSliderLabel.color = "white";
    fovSliderLabel.fontSize = 12;
    fovSliderLabel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    guiContainer.addControl(fovSliderLabel);
    
    // Create the slider
    const fovSlider = new Slider();
    fovSlider.minimum = deg2Rad(10);
    fovSlider.maximum = deg2Rad(120);
    fovSlider.value = sliderVal;
    fovSlider.heightInPixels = 20;
    fovSlider.width = '200px';
    fovSlider.color = "white";
    fovSlider.paddingBottom = "5px";
    fovSlider.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    fovSlider.onValueChangedObservable.add((value) => {
        dispatch(setSliderPVFovVal(value));
        fovSliderLabel.text = `Camera FOV: ${rad2Deg(sliderVal).toFixed(1)}°°`;
    });
    guiContainer.addControl(fovSlider);

    return () => {
        guiTexture.removeControl(guiContainer);
    };

};

/*
// orthographic view function
const OrthographicView = () => {

}


// lerp, slerp, quat interpolated view function
const ViewInterpolation = () => {

}
*/



export default UIElements;