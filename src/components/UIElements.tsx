import { AdvancedDynamicTexture, Slider, TextBlock, Control, Rectangle } from '@babylonjs/gui';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deg2Rad, rad2Deg } from '../Utils';
import { setSliderPVFov, setSliderPVFovTitle } from '../redux/uiSlice';

interface UIElementsProps {
    //guiTexture: AdvancedDynamicTexture;
  }

const UIElements: React.FC<UIElementsProps> = () => {
    const dispatch = useDispatch<AppDispatch>();

    // get current selected menu item ID via redux store
    //const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    const pvSliderFovVal = useSelector((state: RootState) => state.camera.fov);
    // console.log("current selected menu item: ", selectedMenuItem);
   
    useEffect(() => {
        
        // If selected, dispose other UI elements and activate 
        // Perspective view (i.e., FOV angle, front and rear clipping plane)
        const pvCleanup = PerspectiveView(dispatch);


        // If selected, dispose other UI elements and activate 
        // Orthographic view

        // If selected, dispose orthographic view if existing and activate perspective view and 
        // Lerp, slerp, Quat interpolated views

        return pvCleanup;
    

    }, [dispatch, pvSliderFovVal]);



    // perspective view function
    const PerspectiveView = (dispatch: AppDispatch) => {
        const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const sliderContainer = new Rectangle();
        sliderContainer.width = "300px";
        sliderContainer.heightInPixels = 200;
        sliderContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        sliderContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        //sliderContainer.paddingTop = "250px";
        //sliderContainer.paddingRight = "20px";
        sliderContainer.top = "20px";
        sliderContainer.background = "black";
        sliderContainer.alpha = 0.7;
        guiTexture.addControl(sliderContainer);

        // Slider label
        const sliderLabel = new TextBlock();
        //sliderLabel.text = `blah Camera FOV: ${rad2Deg(pvSliderFovVal).toFixed(1)}°`;
        sliderLabel.text = pvSliderFovVal.toString();
        sliderLabel.heightInPixels = 60;
        sliderLabel.color = "white";
        sliderLabel.fontSize = 12;
        sliderLabel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        //sliderLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        sliderContainer.addControl(sliderLabel);
        
        // Create the slider
        const slider = new Slider();
        slider.minimum = deg2Rad(0);
        slider.maximum = deg2Rad(150);
        slider.value = pvSliderFovVal; //deg2Rad(45); // sliderValue; comes from redux sync
        //console.log(slider.value);
//        slider.height = '20px';
        slider.heightInPixels = sliderLabel.heightInPixels - 40;
        slider.width = '200px';
        slider.color = "white";
        slider.paddingBottom = "5px";
        slider.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        slider.onValueChangedObservable.add((value) => {
            dispatch(setSliderPVFov(value));
            //sliderLabel.text = `Camera FOV: ${rad2Deg(pvSliderFovVal).toFixed(1)}°`;
            sliderLabel.text = pvSliderFovVal.toString();
        });
        //guiTexture.addControl(slider);
        sliderContainer.addControl(slider);

        //return guiTexture.removeControl(sliderContainer);
        return () => {
            //guiTexture.removeControl(slider);
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
    return null;

};

export default UIElements;