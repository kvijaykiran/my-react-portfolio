import { AdvancedDynamicTexture, Slider } from '@babylonjs/gui';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deg2Rad } from '../Utils';
import { setSliderPVFov } from '../redux/uiSlice';

interface UIElementsProps {
    guiTexture: AdvancedDynamicTexture;
  }

const UIElements: React.FC<UIElementsProps> = ({ guiTexture }) => {
    const dispatch = useDispatch<AppDispatch>();

    // get current selected menu item ID via redux store
    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    const pvSliderFovVal = useSelector((state: RootState) => state.ui.pvsliderfov);
    console.log("current selected menu item: ", selectedMenuItem);
   
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



    // perspective view function
    const PerspectiveView = (guiTexture: AdvancedDynamicTexture, sliderValue: number, dispatch: AppDispatch) => {
        // Create the slider
        const slider = new Slider();
        slider.minimum = deg2Rad(30);
        slider.maximum = deg2Rad(75);
        slider.value = sliderValue; //deg2Rad(45); // sliderValue; comes from redux sync
        console.log(slider.value);
        slider.height = '20px';
        slider.width = '200px';
        slider.color = "white";
        slider.onValueChangedObservable.add((value) => {
            dispatch(setSliderPVFov(value));
        });
        guiTexture.addControl(slider);

        return () => {
            guiTexture.removeControl(slider);
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