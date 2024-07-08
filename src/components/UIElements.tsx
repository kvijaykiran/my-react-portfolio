import { AdvancedDynamicTexture, Slider, TextBlock, Control, Rectangle } from '@babylonjs/gui';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deg2Rad, rad2Deg } from '../Utils';
import { setSliderPVFovVal } from '../redux/uiSlice';

interface UIElementsProps {
    guiTexture: AdvancedDynamicTexture;
  }

// perspective view function
const PerspectiveView = (guiTexture: AdvancedDynamicTexture, sliderVal: number, dispatch: AppDispatch) => {
    //const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const sliderContainer = new Rectangle();
    sliderContainer.width = "300px";
    sliderContainer.heightInPixels = 200;
    sliderContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    sliderContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    sliderContainer.top = "20px";
    sliderContainer.background = "black";
    sliderContainer.alpha = 0.7;
    guiTexture.addControl(sliderContainer);

    // Slider label
    const sliderLabel = new TextBlock();
    sliderLabel.text = `Camera FOV: ${rad2Deg(sliderVal).toFixed(1)}°`;
    sliderLabel.heightInPixels = 60;
    sliderLabel.color = "white";
    sliderLabel.fontSize = 12;
    sliderLabel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    sliderContainer.addControl(sliderLabel);
    
    // Create the slider
    const slider = new Slider();
    slider.minimum = deg2Rad(10);
    slider.maximum = deg2Rad(120);
    slider.value = sliderVal;
    slider.heightInPixels = sliderLabel.heightInPixels - 40;
    slider.width = '200px';
    slider.color = "white";
    slider.paddingBottom = "5px";
    slider.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    slider.onValueChangedObservable.add((value) => {
        dispatch(setSliderPVFovVal(value));
        sliderLabel.text = `Camera FOV: ${rad2Deg(sliderVal).toFixed(1)}°°`;
    });
    sliderContainer.addControl(slider);

    return () => {
        guiTexture.removeControl(sliderContainer);
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



const UIElements: React.FC<UIElementsProps> = ({guiTexture}) => {
    const dispatch = useDispatch<AppDispatch>();

    // get current selected menu item ID via redux store
    //const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    const pvSliderFovVal = useSelector((state: RootState) => state.ui.sliderval_pvfov);
    // console.log("current selected menu item: ", selectedMenuItem);
   
    useEffect(() => {
        
        // If selected, dispose other UI elements and activate 
        // Perspective view (i.e., FOV angle, front and rear clipping plane)
        const pvCleanup = PerspectiveView(guiTexture, pvSliderFovVal, dispatch);


        // If selected, dispose other UI elements and activate 
        // Orthographic view

        // If selected, dispose orthographic view if existing and activate perspective view and 
        // Lerp, slerp, Quat interpolated views

        return pvCleanup;
    

    }, [dispatch, guiTexture, pvSliderFovVal]);

    return null;

};

export default UIElements;