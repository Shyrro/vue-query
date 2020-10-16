import  QueryClientProvider  from '../QueryClientProvider.ts';
import { mount } from '@vue/test-utils';
import { QueryCache, QueryClient } from '../../core';

// The test below is not how this component should be tested
// It's just a draft to see if the tests are working
describe('QueryClientProvider', () => {
    let wrapper: any;

    beforeEach(() => {        
        const cache = new QueryCache();
        wrapper = mount(QueryClientProvider, {            
            propsData: {
                client: new QueryClient({ cache }),
            }
        });
    });
    
    it('should test' , () => {        
        // This test is working but just here to see if tests are working
        // Other than that it doesn't have any purpose
        expect(wrapper.props().client).toBeFalsy();
    });
})